/**
AppComponentTree

Root
	MainContainer
		ApplicationHeader
		ApplicationContent
 */

// Todo: remove
const AttributeManagement = '';

// application header
interface ApplicationHeader {
    // the main title of the application
    title: string;

    // logo of the app / when not defined the default is used
    logo: React.Component;
}

// actual application content
interface ApplicationContent {
    // content items
    content: Array<ApplicationContentItem>;

    // tabs of this content view
    tabs: Array<ApplicationTab>;
}

// tabs are subpages of a content / say we have the view UserManagement
// this content could be devided into subpages "Listing", "AddNewForm", etc.
// those subpages are tabs
interface ApplicationTab {
    // id of this tab to identify it // when not defined the id is generated automatically
    // when you want this id you need to get the tab instance by name
    id: string;

    // front representation of this tab // what the user sees
    label: String;

    // since tabs are part of the router and are an actual own 'page'
    // this property contains the component which will be rendered
    contentItemId: string;
}

// a content item is where the actual content component is defined
interface ApplicationContentItem {
    // id of this item to identify it // when not defined, a random id is generated automatically
    // this is mostly to satisfy react craving desperatly for a key property
    id: string;

    // component which will be rendered
    component: React.Component;

    // when the content is loading or is defined this Component will be rendered
    fallbackComponent: React.Component;
}

// contains information about a route and what component should be rendered in that route
interface AppRoute {
    // component which will be rendered when the route matches
    component: React.Component;

    // when the content is loading or is defined this Component will be rendered
    fallbackComponent: React.Component;
}

// the main app container / this is where everything lies
interface ApplicationContainerConfig {
    routes: Array<object>;
    header: ApplicationHeader;
    content: ApplicationContent;
}

// test data to visualize what the indended idea was
const ApplicationContentTree = {
    routes: [
        {
            title: 'AttributeManagement',
            component: AttributeManagement
        }
    ]
};
