import axios from "axios";
import { SearchFromSpotify } from "../interfaces/searchData.interface";
import { TOKEN } from "./getTOKEN";

function reworkData(data: SearchFromSpotify | undefined): string[] {
    const tracks: string[] = [];
    if (data) {
        for (const item of data.tracks.items) {
            tracks.push(item.id);
        }
    }
    return tracks;
}

async function getPage(url: string): Promise<SearchFromSpotify | undefined> {
    const token = localStorage.getItem(TOKEN);

    const options = {
        method: "GET",
        url: url,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    try {
        const response = await axios.request<SearchFromSpotify>(options);
        const data = response.data;
        // if (data.tracks.next) {
        //     const add = await getPage(data.tracks.next).then(d => {
        //         return d?.tracks.items;
        //     });
        //     if (add) {
        //         data.tracks.items.concat(add);
        //     }
        // }
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function searchAPI(searchString: string) {
    try {
        const url = `https://api.spotify.com/v1/search?q=${searchString}&type=track&limit=50&offset=25`;
        return reworkData(await getPage(url));
    } catch (error) {
        console.error(error);
    }
}