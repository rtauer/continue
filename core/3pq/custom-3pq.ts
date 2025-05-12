import { IDE } from "..";
import { AutocompleteCodeSnippet, AutocompleteSnippet, AutocompleteSnippetType } from "../autocomplete/snippets/types";
import * as logger from './logger'

const file = "file:///mnt/c/Users/rtauer/AppData/Roaming/plansoft/engines/product-configurator-v1.18.8-win/Content/Base/Scripts/system/ConfigurationApi.d.ts"

export async function augmentContextItems(items: any[], context: any, fullInput: any): Promise<any[]> {
    //TODO LOGS SCHREIBEN FÜR BESSERES ANGENEHMERES ÜBERPRÜFEN DER STEPS
    //TODO Query Eingabe nicht mehr Hardcoden
  
  let mylogger = logger.Logger;
  mylogger.level = "debug";

  const parsedFullInput = JSON.parse(fullInput);
  const query = parsedFullInput[0]?.text;

  let json = JSON.stringify({
    "query":query,
    "n_results":5
  })
  
  let response = await fetch("http://172.26.240.1:8000/chroma", {method:"POST", headers:{"Content-Type": "application/json"}, body:json})
  let result = await response.json()
  let docs = result.documents.join("\n")

  items.push({
    content: docs,
    description: "ConfigurationApi.d.ts",
    name: "ConfigurationApi.d.ts",
    uri: {
        type: 'file',
        value: file
    }
  });
  mylogger.debug("augmentContextItems - "+docs);
  return items;
  
}

export function renderAugmentedPrompt(promptObject: any): any {
    // TODO wie sieht prompt aus bei dem man 2 dateien reinschmeißt und nachbauen
    return promptObject;
  
  }

export async function getAugmentedSnippetPayload(snippetPayload: AutocompleteCodeSnippet[], ide: IDE): Promise<AutocompleteCodeSnippet[]> {
  snippetPayload.push({
    content: await ide.readFile(file),
    filepath: file,
    type: AutocompleteSnippetType.Code
  });
  return snippetPayload;
}