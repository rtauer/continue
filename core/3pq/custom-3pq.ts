const file = "file:///mnt/c/Users/rtauer/AppData/Roaming/plansoft/engines/product-configurator-v1.18.8-win/Content/Base/Scripts/system/ConfigurationApi.d.ts"

export async function augmentContextItems(items: any[], context: any): Promise<any[]> {
    //TODO Schauen wo Chat zusammengesetzt wird und wo Prompt herkommt
    // Bevor Prompt verarbeitet wird, ConfigApidts reinschmeißen
  items.push({
    content: await context.readFile(file),
    description: "ConfigurationApi.d.ts",
    name: "ConfigurationApi.d.ts",
    uri: {
        type: 'file',
        value: file
    }
  });
  return items;
  
}

export function renderAugmentedPrompt(promptObject: any): any {
    // TODO wie sieht prompt aus bei dem man 2 dateien reinschmeißt und nachbauen
    return promptObject;
  
  }