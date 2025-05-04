import {
    JSONLocalFileClient,
    RequestResponse
} from "@beexy/tools"

export async function loadData(path: string): Promise<RequestResponse> {

    const jsoncl = new JSONLocalFileClient();

    const response = await jsoncl.requestData(path);

    return response;

}