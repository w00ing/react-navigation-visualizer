/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')
const babel = require('@babel/core')
const {parse} = require('@babel/parser')
const traverse = require('@babel/traverse').default
const t = require('@babel/types')
const glob = require('glob')

// Expanded set of navigator creators
const NAVIGATOR_CREATORS = new Set([
  'createStackNavigator',
  'createBottomTabNavigator',
  'createDrawerNavigator',
  'createMaterialTopTabNavigator',
  'createNativeStackNavigator',
  'createMaterialBottomTabNavigator',
  'createNavigationContainerRef',
])

// Add support for member expressions like NavigationContainer.Navigator
const NAVIGATOR_COMPONENTS = new Set([
  'NavigationContainer',
  'Stack',
  'Tab',
  'Drawer',
  'MaterialTopTabs',
  'MaterialBottomTabs',
  'NativeStack',
])

function getAllSourceFiles(rootDir) {
  const pattern = path.join(rootDir, '**', '*.{js,jsx,ts,tsx}')
  return glob.sync(pattern, {
    ignore: [
      '**/node_modules/**',
      '**/android/**',
      '**/ios/**',
      '**/build/**',
      '**/dist/**',
      '**/.git/**',
    ],
  })
}

function findNavigatorVariableDeclarations(ast) {
  const navigators = {}

  traverse(ast, {
    VariableDeclarator(path) {
      const init = path.node.init
      if (!init) return

      // Handle direct calls: const Stack = createStackNavigator()
      if (
        t.isCallExpression(init) &&
        t.isIdentifier(init.callee) &&
        NAVIGATOR_CREATORS.has(init.callee.name)
      ) {
        const varName = path.node.id.name
        const calleeName = init.callee.name
        navigators[varName] = calleeName
      }

      // Handle member expressions: const Stack = createNativeStackNavigator
      if (
        t.isMemberExpression(init) &&
        t.isIdentifier(init.property) &&
        NAVIGATOR_CREATORS.has(init.property.name)
      ) {
        const varName = path.node.id.name
        const calleeName = init.property.name
        navigators[varName] = calleeName
      }
    },
    ImportDeclaration(path) {
      // Handle named imports
      path.node.specifiers.forEach(specifier => {
        if (
          (t.isImportSpecifier(specifier) ||
            t.isImportDefaultSpecifier(specifier)) &&
          (NAVIGATOR_CREATORS.has(specifier.local.name) ||
            NAVIGATOR_COMPONENTS.has(specifier.local.name))
        ) {
          navigators[specifier.local.name] = specifier.local.name
        }
      })
    },
  })

  return navigators
}

function getElementProps(element) {
  const props = {}
  element.attributes.forEach(attr => {
    if (t.isJSXAttribute(attr) && t.isJSXIdentifier(attr.name)) {
      const propName = attr.name.name
      if (t.isStringLiteral(attr.value)) {
        props[propName] = attr.value.value
      } else if (t.isJSXExpressionContainer(attr.value)) {
        const expression = attr.value.expression
        if (t.isIdentifier(expression)) {
          props[propName] = expression.name
        } else if (t.isStringLiteral(expression)) {
          props[propName] = expression.value
        } else if (t.isTemplateLiteral(expression)) {
          props[propName] = expression.quasis[0].value.raw
        } else if (t.isMemberExpression(expression)) {
          props[
            propName
          ] = `${expression.object.name}.${expression.property.name}`
        } else if (
          t.isArrowFunctionExpression(expression) ||
          t.isFunctionExpression(expression)
        ) {
          props[propName] = 'Function'
        } else if (t.isObjectExpression(expression)) {
          props[propName] = getObjectExpressionValue(expression)
        } else {
          props[propName] = 'Expression'
        }
      }
    }
  })
  return props
}

function getObjectExpressionValue(objectExpression) {
  const obj = {}
  objectExpression.properties.forEach(prop => {
    if (t.isObjectProperty(prop)) {
      const key = prop.key.name
      if (t.isStringLiteral(prop.value)) {
        obj[key] = prop.value.value
      } else if (t.isNumericLiteral(prop.value)) {
        obj[key] = prop.value.value
      } else if (t.isIdentifier(prop.value)) {
        obj[key] = prop.value.name
      } else if (t.isBooleanLiteral(prop.value)) {
        obj[key] = prop.value.value
      } else {
        obj[key] = 'Expression'
      }
    }
  })
  return obj
}

function getScreenChildren(node) {
  const children = []
  node.children.forEach(child => {
    if (t.isJSXElement(child)) {
      children.push({
        type: child.openingElement.name.name,
        props: getElementProps(child.openingElement),
      })
    }
  })
  return children
}

function findNavigatorScreens(ast, navigators) {
  const results = []
  let currentNavigator = null

  traverse(ast, {
    JSXElement: {
      enter(path) {
        const openingElement = path.node.openingElement
        if (
          !t.isJSXIdentifier(openingElement.name) &&
          !t.isJSXMemberExpression(openingElement.name)
        )
          return

        let tagName
        if (t.isJSXIdentifier(openingElement.name)) {
          tagName = openingElement.name.name
        } else if (t.isJSXMemberExpression(openingElement.name)) {
          const object = openingElement.name.object.name
          const property = openingElement.name.property.name
          tagName = `${object}.${property}`
        }

        const parts = tagName.split('.')
        if (parts.length !== 2) return

        const [possiblyNavigatorVarName, navigatorElement] = parts

        // Handle Navigator elements
        if (navigatorElement === 'Navigator') {
          if (
            navigators[possiblyNavigatorVarName] ||
            NAVIGATOR_COMPONENTS.has(possiblyNavigatorVarName)
          ) {
            currentNavigator = {
              navigatorVar: possiblyNavigatorVarName,
              navigatorType:
                navigators[possiblyNavigatorVarName] ||
                possiblyNavigatorVarName,
              screens: [],
              options: getElementProps(openingElement),
            }
          }
        }

        // Handle Screen elements
        if (navigatorElement === 'Screen' && currentNavigator) {
          const props = getElementProps(openingElement)
          const screenInfo = {
            name: props.name || 'Unnamed Screen',
            component: props.component || 'Unknown',
            options: props.options || {},
            initialParams: props.initialParams || {},
            children: getScreenChildren(path.node),
          }
          currentNavigator.screens.push(screenInfo)
        }
      },
      exit(path) {
        const openingElement = path.node.openingElement
        if (
          t.isJSXMemberExpression(openingElement.name) &&
          openingElement.name.property.name === 'Navigator' &&
          currentNavigator &&
          currentNavigator.screens.length > 0
        ) {
          results.push(currentNavigator)
          currentNavigator = null
        }
      },
    },
  })

  return results
}

function analyzeFile(filePath) {
  try {
    const code = fs.readFileSync(filePath, 'utf8')
    const ast = parse(code, {
      sourceType: 'module',
      plugins: [
        'jsx',
        'typescript',
        'decorators-legacy',
        'classProperties',
        'objectRestSpread',
      ],
    })

    const navigators = findNavigatorVariableDeclarations(ast)
    const routeConfigs = findNavigatorScreens(ast, navigators)

    return routeConfigs
  } catch (err) {
    console.error(`Error analyzing file ${filePath}:`, err.message)
    return []
  }
}

// Add layout calculation function
function calculateNodePositions(nodes, edges) {
  const VERTICAL_SPACING = 60 // Reduced from 100
  const HORIZONTAL_SPACING = 180 // Reduced from 250
  const MAX_NODES_PER_COLUMN = 8 // Maximum nodes in a column before starting a new one

  // Create a map of node levels (depth in the navigation tree)
  const nodeLevels = new Map()
  const nodesByLevel = new Map()
  const navigatorGroups = new Map() // Group screens by their parent navigator

  // Find root nodes (nodes that are only sources, never targets)
  const targetNodes = new Set(edges.map(e => e.target))
  const rootNodes = nodes.filter(node => !targetNodes.has(node.id))

  // First pass: Assign levels and group screens by navigator
  function assignLevels(nodeId, level = 0, navigatorId = null) {
    if (nodeLevels.has(nodeId)) return

    nodeLevels.set(nodeId, level)
    if (!nodesByLevel.has(level)) {
      nodesByLevel.set(level, [])
    }
    nodesByLevel.get(level).push(nodeId)

    // If this is a navigator, use it as the group for its children
    const node = nodes.find(n => n.id === nodeId)
    const currentNavigatorId = node.type === 'navigator' ? nodeId : navigatorId

    if (currentNavigatorId) {
      if (!navigatorGroups.has(currentNavigatorId)) {
        navigatorGroups.set(currentNavigatorId, [])
      }
      navigatorGroups.get(currentNavigatorId).push(nodeId)
    }

    // Find child nodes and assign next level
    edges
      .filter(edge => edge.source === nodeId)
      .forEach(edge => assignLevels(edge.target, level + 1, currentNavigatorId))
  }

  // Start level assignment from root nodes
  rootNodes.forEach(node => assignLevels(node.id))

  // Second pass: Position nodes with grouping consideration
  const maxLevel = Math.max(...Array.from(nodeLevels.values()))
  let currentColumn = 0

  for (let level = 0; level <= maxLevel; level++) {
    const nodesAtLevel = nodesByLevel.get(level) || []
    let verticalPosition = 0

    nodesAtLevel.forEach((nodeId, index) => {
      const node = nodes.find(n => n.id === nodeId)

      // Start a new column if we exceed MAX_NODES_PER_COLUMN
      if (verticalPosition >= VERTICAL_SPACING * MAX_NODES_PER_COLUMN) {
        currentColumn++
        verticalPosition = 0
      }

      // If this is a screen, try to position it near its navigator
      const parentEdge = edges.find(e => e.target === nodeId)
      if (parentEdge && node.type === 'screen') {
        const parentNode = nodes.find(n => n.id === parentEdge.source)
        if (parentNode && parentNode.position) {
          verticalPosition = parentNode.position.y + VERTICAL_SPACING
        }
      }

      node.position = {
        x: currentColumn * HORIZONTAL_SPACING,
        y: verticalPosition,
      }

      verticalPosition += VERTICAL_SPACING
    })

    currentColumn++
  }

  return nodes
}

function parseNavigationTree(files) {
  const nodes = new Map()
  const edges = new Map()

  function addNode(name, type, data) {
    // Strip NavigatorName/ScreenName prefix
    const id = name.split('.').pop()
    nodes.set(id, {
      id,
      type,
      data: {
        label: id
          .split('_')
          .map(word => word.charAt(0) + word.slice(1).toLowerCase())
          .join(' '),
        fullName: name,
        ...data,
      },
    })
    return id
  }

  function addEdge(source, target, type, params = {}) {
    const id = `${source}-${target}`
    edges.set(id, {
      id,
      source,
      target,
      type,
      data: {params},
    })
  }

  files.forEach(file => {
    file.routeDefs.forEach(routeDef => {
      // Add navigator node
      const navigatorId = addNode(routeDef.navigatorVar, 'navigator', {
        component: routeDef.navigatorVar,
        navigatorType: routeDef.navigatorType,
        file: file.file,
      })

      // Add screen nodes and edges
      routeDef.screens.forEach(screen => {
        const screenId = addNode(screen.name, 'screen', {
          component: screen.component,
          file: file.file,
        })

        addEdge(navigatorId, screenId, 'navigator', {
          required: screen.initialParams,
          optional: {}, // Extract from TypeScript types if available
        })
      })
    })
  })

  // Convert Maps to Arrays and calculate positions
  const nodesArray = Array.from(nodes.values())
  const edgesArray = Array.from(edges.values())

  // Calculate positions for the nodes
  const nodesWithPositions = calculateNodePositions(nodesArray, edgesArray)

  return {
    nodes: nodesWithPositions,
    edges: edgesArray,
  }
}

function main() {
  try {
    const projectRoot = process.argv[2] || './src'
    const files = getAllSourceFiles(projectRoot)

    console.log(`Analyzing ${files.length} files for navigation structure...`)

    const allRoutes = []
    files.forEach(file => {
      const routeDefs = analyzeFile(file)
      if (routeDefs.length > 0) {
        allRoutes.push({
          file: path.relative(projectRoot, file),
          routeDefs,
        })
      }
    })

    const navigationTree = parseNavigationTree(allRoutes)

    // Add React Flow specific properties to nodes
    navigationTree.nodes = navigationTree.nodes.map(node => ({
      ...node,
      // React Flow expects these properties
      position: node.position || {x: 0, y: 0},
      type: node.type === 'navigator' ? 'navigator' : 'screen',
      sourcePosition: 'right',
      targetPosition: 'left',
    }))

    // Add React Flow specific properties to edges
    navigationTree.edges = navigationTree.edges.map(edge => ({
      ...edge,
      type: 'smoothstep', // React Flow edge type
      animated: true,
    }))

    const timestamp = new Date()
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/[T.]/g, '_')
      .slice(0, 15)

    const outputPath = path.join(
      process.cwd(),
      `navigationTree_${timestamp}.json`,
    )
    fs.writeFileSync(outputPath, JSON.stringify(navigationTree, null, 2))

    console.log(`✅ Navigation tree written to: ${outputPath}`)
  } catch (err) {
    console.error('❌ Error generating navigation tree:', err)
    process.exit(1)
  }
}

main()
