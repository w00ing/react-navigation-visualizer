export interface NavigationScreen {
  name: string;
  component: string;
  options?: Record<string, any>;
  initialParams?: Record<string, any>;
  children?: NavigationScreen[];
}

/** Basic structure for each route definition (navigator). */
export interface NavigationRouteDef {
  navigatorVar: string;
  navigatorType: string;
  screens: Screen[];
  options: {
    initialRouteName: string;
    tabBar?: string;
    safeAreaInsets?: string;
    screenOptions: Record<string, any>;
  };
}

/** Basic structure for each file-level entry in the navigation JSON. */
export interface NavigationFile {
  file: string;
  routeDefs: NavigationRouteDef[];
}

export interface Screen {
  name: string;
  component: string;
  options: Record<string, any>;
  initialParams: Record<string, any>;
  children: any[];
}

export default [
  {
    file: "navigations/TrunkStackNavigator.tsx",
    routeDefs: [
      {
        navigatorVar: "TrunkStack",
        navigatorType: "createStackNavigator",
        screens: [
          {
            name: "NavigatorName.MAIN_TAB",
            component: "MainTabNavigator",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "NavigatorName.QNA_STACK",
            component: "QnaStackNavigator",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.OBJET_SHOP_PAGE",
            component: "ObjetShopPage",
            options: {
              gestureEnabled: true,
            },
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.OBJET_PREVIEW_PAGE",
            component: "ObjetPreviewPage",
            options: {
              gestureEnabled: true,
            },
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.OBJET_PURCHASE_PAGE",
            component: "ObjetPurchasePage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.SHOP_PAGE",
            component: "ShopPage",
            options: {
              gestureEnabled: true,
            },
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.GOLD_PURCHASE_PAGE",
            component: "GoldPurchasePage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.MEMO_WRITE_PAGE",
            component: "MemoWritePage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.MEMO_CONFIRM_PAGE",
            component: "MemoConfirmPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.COUPLE_MEMO_LIST_PAGE",
            component: "CoupleMemoListPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.COUPLE_MEMO_DETAIL_PAGE",
            component: "CoupleMemoDetailPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.DIARY_DRAW_PAGE",
            component: "DiaryDrawPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.PET_REGISTRATION_PAGE",
            component: "PetRegistrationPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.PET_SPACE_CUSTOM_PAGE",
            component: "PetSpaceCustomPage",
            options: {
              gestureEnabled: true,
            },
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.PET_SKIN_SHOP_PAGE",
            component: "PetSkinShopPage",
            options: {
              gestureEnabled: true,
            },
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.PET_SKIN_GACHA_PAGE",
            component: "PetSkinGachaPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.PET_SKIN_CUSTOM_PAGE",
            component: "PetSkinCustomPage",
            options: {
              gestureEnabled: true,
            },
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.PET_EVOLVE_PAGE",
            component: "PetEvolvePage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.DIARY_LIST_PAGE",
            component: "DiaryListPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.DIARY_DETAIL_PAGE",
            component: "DiaryDetailPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.DIARY_DELIVERY_PAGE",
            component: "DiaryDeliveryPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.COUPLE_CONNECT_PAGE",
            component: "CoupleConnectPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.COUPLE_DISCONNECT_PAGE",
            component: "CoupleDisconnectPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.INVITE_PAGE",
            component: "InvitePage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.WEB_PAGE",
            component: "WebPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.WITHDRAWAL_PAGE",
            component: "WithdrawalPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.COUPLE_RESTORE_PAGE",
            component: "CoupleRestorePage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.USER_BIRTH_EDIT_PAGE",
            component: "UserBirthEditPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.USER_BLOOD_EDIT_PAGE",
            component: "UserBloodEditPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.USER_NICKNAME_EDIT_PAGE",
            component: "UserNicknameEditPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.COUPLE_START_DATE_EDIT_PAGE",
            component: "CoupleStartDateEditPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.SUMONE_TIME_PAGE",
            component: "SumoneTimePage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.REVIEW_PAGE",
            component: "ReviewPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.COUPLE_WELCOME_PAGE",
            component: "CoupleWelcomePage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.INVITATION_PAGE",
            component: "InvitationPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.INVITE_ACCEPT_PAGE",
            component: "InviteAcceptPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.TIME_CAPSULE_DETAIL_PAGE",
            component: "TimeCapsuleDetailPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.INVITATION_QNA_PAGE",
            component: "InvitationQnaPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.ITEM_STORAGE_PAGE",
            component: "ItemStoragePage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.QNA_BOOKMARK_LIST_PAGE",
            component: "BookmarkListPage",
            options: {
              cardStyleInterpolator: "Expression",
              gestureEnabled: true,
              gestureDirection: "horizontal",
            },
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.QNA_BOOKMARK_SWIPE_LIST_PAGE",
            component: "BookmarkSwipableListPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.WEEKEND_EVENT_PAGE",
            component: "WeekendEventPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.PET_STATUS_TUTORIAL_PAGE",
            component: "PetStatusTutorialPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "NavigatorName.ZERO_TO_ONE_STACK",
            component: "ZeroToOneStackNavigator",
            options: {
              cardStyleInterpolator: "Expression",
              gestureEnabled: true,
              gestureDirection: "horizontal",
            },
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.FRIEND_INVITE_EVENT_PAGE",
            component: "FriendInviteEventPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.FRIEND_INVITE_INPUT_PAGE",
            component: "FriendInviteInputPage",
            options: {
              gestureEnabled: true,
            },
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.MAFOO_EVENT_PAGE",
            component: "MafooEventPage",
            options: {},
            initialParams: {},
            children: [],
          },
        ],
        options: {
          initialRouteName: "NavigatorName.MAIN_TAB",
          screenOptions: {
            headerMode: "screen",
            headerShown: false,
            gestureEnabled: false,
          },
        },
      },
    ],
  },
  {
    file: "navigations/SettingStackNavigator.tsx",
    routeDefs: [
      {
        navigatorVar: "SettingStack",
        navigatorType: "createStackNavigator",
        screens: [
          {
            name: "ScreenName.COUPLE_PROFILE_PAGE",
            component: "CoupleProfilePage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.SETTING_PAGE",
            component: "SettingPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.SYSTEM_INFO_PAGE",
            component: "SystemInfoPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.COUPLE_CONNECTION_INFO_PAGE",
            component: "CoupleConnectionInfoPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.COUPLE_INFO_PAGE",
            component: "CoupleInfoPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.DATA_REFRESH_PAGE",
            component: "DataRefreshPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.CS_CATEGORY_PAGE",
            component: "CSCategoryPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.ITEM_STORAGE_PAGE",
            component: "ItemStoragePage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.LANGUAGE_PAGE",
            component: "LanguagePage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.NOTIFICATION_SETTING_PAGE",
            component: "NotificationSettingPage",
            options: {},
            initialParams: {},
            children: [],
          },
        ],
        options: {
          initialRouteName: "ScreenName.COUPLE_PROFILE_PAGE",
          screenOptions: {
            headerShown: false,
          },
        },
      },
    ],
  },
  {
    file: "navigations/RootNavigator.tsx",
    routeDefs: [
      {
        navigatorVar: "RootStack",
        navigatorType: "createStackNavigator",
        screens: [
          {
            name: "NavigatorName.TRUNK_STACK",
            component: "TrunkStackNavigator",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.USER_ACTIVATE_PAGE",
            component: "UserActivatePage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.AUTH_LANDING_PAGE",
            component: "AuthLandingPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.WEB_PAGE",
            component: "WebPage",
            options: {
              headerMode: "screen",
            },
            initialParams: {},
            children: [],
          },
        ],
        options: {
          screenOptions: {
            headerMode: "screen",
            headerShown: false,
          },
        },
      },
    ],
  },
  {
    file: "navigations/QnaTabNavigator.tsx",
    routeDefs: [
      {
        navigatorVar: "QnATab",
        navigatorType: "createBottomTabNavigator",
        screens: [
          {
            name: "ScreenName.QNA_LIST_PAGE",
            component: "QnaListPage",
            options: {},
            initialParams: {},
            children: [],
          },
        ],
        options: {
          initialRouteName: "ScreenName.QNA_LIST_PAGE",
          safeAreaInsets: {
            bottom: 0,
          },
          screenOptions: {
            headerShown: false,
            tabBarStyle: "Expression",
          },
        },
      },
    ],
  },
  {
    file: "navigations/QnaStackNavigator.tsx",
    routeDefs: [
      {
        navigatorVar: "TrunkStack",
        navigatorType: "createStackNavigator",
        screens: [
          {
            name: "ScreenName.QNA_SWIPE_LIST_PAGE",
            component: "QnaListSwipePage",
            options: {
              title: "Expression",
            },
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.QNA_ANSWER_PAGE",
            component: "QnaAnswerPage",
            options: {
              title: "Expression",
            },
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.QNA_COMMENT_PAGE",
            component: "QnaCommentPage",
            options: {
              cardStyleInterpolator: "Expression",
              title: "Expression",
            },
            initialParams: {},
            children: [],
          },
        ],
        options: {
          screenOptions: {
            headerShown: false,
          },
          initialRouteName: "ScreenName.QNA_SWIPE_LIST_PAGE",
        },
      },
    ],
  },
  {
    file: "navigations/MainTabNavigator.tsx",
    routeDefs: [
      {
        navigatorVar: "MainTab",
        navigatorType: "createBottomTabNavigator",
        screens: [
          {
            name: "NavigatorName.HOME_STACK",
            component: "HomeStackNavigator",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "NavigatorName.QNA_TAB",
            component: "QnATabNavigator",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "NavigatorName.SETTING_STACK",
            component: "SettingStackNavigator",
            options: {},
            initialParams: {},
            children: [],
          },
        ],
        options: {
          initialRouteName: "NavigatorName.HOME_STACK",
          tabBar: "Function",
          safeAreaInsets: "safeAreaInsets",
          screenOptions: "Function",
        },
      },
    ],
  },
  {
    file: "navigations/HomeStackNavigator.tsx",
    routeDefs: [
      {
        navigatorVar: "HomeStack",
        navigatorType: "createStackNavigator",
        screens: [
          {
            name: "ScreenName.HOME_PAGE",
            component: "HomePage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.HISTORY_LIST_PAGE",
            component: "HistoryListPage",
            options: {},
            initialParams: {},
            children: [],
          },
        ],
        options: {
          screenOptions: {
            headerShown: false,
          },
          initialRouteName: "ScreenName.HOME_PAGE",
        },
      },
    ],
  },
  {
    file: "navigations/CalendarStackNavigator.tsx",
    routeDefs: [
      {
        navigatorVar: "CalendarStack",
        navigatorType: "createStackNavigator",
        screens: [
          {
            name: "ScreenName.SUMLOG_TIMELINE_PAGE",
            component: "SumlogTimelinePage",
            options: {
              cardStyleInterpolator: "Expression",
            },
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.SUMLOG_CALENDAR_PAGE",
            component: "SumlogCalendarPage",
            options: {
              cardStyleInterpolator: "Expression",
            },
            initialParams: {},
            children: [],
          },
        ],
        options: {
          initialRouteName: "initialRouteName",
          screenOptions: {
            headerShown: false,
            headerMode: "screen",
            headerStyle: "Expression",
            gestureEnabled: false,
          },
        },
      },
    ],
  },
  {
    file: "navigations/ZeroToOneStackNavigator/ZeroToOneStackNavigatorOrganizer.tsx",
    routeDefs: [
      {
        navigatorVar: "ZeroToOneStack",
        navigatorType: "createStackNavigator",
        screens: [
          {
            name: "ScreenName.SUMLOG_INITIAL_PAGE",
            component: "SumlogInitialPage",
            options: {
              headerShown: false,
            },
            initialParams: {},
            children: [],
          },
          {
            name: "NavigatorName.BUCKET_LIST_STACK",
            component: "BucketListPage",
            options: {},
            initialParams: {},
            children: [],
          },
          {
            name: "NavigatorName.DDAY_STACK",
            component: "DDayStackNavigator",
            options: {
              headerShown: false,
            },
            initialParams: {},
            children: [],
          },
          {
            name: "NavigatorName.CALENDAR_STACK",
            component: "CalendarStackNavigator",
            options: {
              headerShown: false,
              animationEnabled: true,
              transitionSpec: "Expression",
              headerStyleInterpolator: "Expression",
            },
            initialParams: {},
            children: [],
          },
          {
            name: "NavigatorName.SUMLOG_INPUT_DIARY_STACK",
            component: "SumlogInputDiaryStackNavigator",
            options: {
              headerShown: false,
            },
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.SUMLOG_INPUT_PHOTO_LOADING_PAGE",
            component: "SumlogInputPhotoLoadingPage",
            options: {
              cardStyleInterpolator: "Expression",
              gestureEnabled: false,
              headerShown: false,
            },
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.SUMLOG_PHOTO_VIEWER_PAGE",
            component: "SumlogPhotoViewerPage",
            options: {
              cardStyleInterpolator: "Expression",
              cardStyle: "Expression",
              presentation: "transparentModal",
              headerShown: false,
            },
            initialParams: {},
            children: [],
          },
          {
            name: "ScreenName.DIARY_LIST_PAGE",
            component: "DiaryListPage",
            options: {
              cardStyleInterpolator: "Expression",
              cardStyle: "Expression",
              presentation: "transparentModal",
              headerShown: false,
            },
            initialParams: {},
            children: [],
          },
        ],
        options: {
          initialRouteName: "currentTab",
          screenOptions: {
            animationTypeForReplace: "pop",
            headerTitle: " ",
            headerBackground: "Expression",
            headerLeftContainerStyle: "Expression",
            headerStyle: "Expression",
            headerRight: "Expression",
            animationEnabled: true,
            headerTitleAlign: "center",
            headerShown: true,
            headerBackTitleVisible: false,
            headerBackTitle: " ",
            headerBackImage: "Expression",
          },
        },
      },
    ],
  },
];
