import { parse as TOMLParse, stringify as TOMLStringify } from "@ltd/j-toml"
import type { Homepage } from "./Homepage.class"

/**
 * See documentation : https://www.npmjs.com/package/@ltd/j-toml
 */
const OPTIONS_STRINGIFY:Readonly<{}> = {
    newline:'\n',
    newlineAround:'section',
    indent:'  '
}

export function stringify(homepage:Homepage):string{
    return TOMLStringify(homepage as any, OPTIONS_STRINGIFY)
}

/**
 * See documentation : https://www.npmjs.com/package/@ltd/j-toml
 */
//const OPTIONS_PARSE:Readonly<{}> = {
//}

export function parse(tomlValue:string):object{
    return TOMLParse(tomlValue,1.0)
}