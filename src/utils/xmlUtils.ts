import {xml2js} from "xml-js";

const parseXML = (xml: string) => {
    const output = xml2js(xml, {compact: true}) as any;
    if (!output.flow) {
        throw new Error("Not xml file");
    }
    return output;
};

export const fetchXML = async (xml: string) => {
    const response = await fetch(xml);
    const text = await response.text();
    return parseXML(text);
};