declare module "../js/store" {
    const store: {
        // Define the store structure based on your usage
        state: any;
        dispatch: (action: string, payload?: any) => void;
        getState: () => any;
        [key: string]: any;
    };
    export default store;
}
