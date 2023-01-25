export const DBConfig = {
    name: 'otionSetsDB',
    version: 1,
    objectStoresMeta: [
        {
            store: 'optionSets',
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: [
                { name: 'options', keypath: 'options', options: { unique: false } },
            ]
        }
    ]
}