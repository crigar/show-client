import { Externals } from "./externals"
import { Network } from "./network"
import { Rating } from "./rating"
import { Schedule } from "./schedule"

export interface Show {
    id: number,
    name: string,
    type: string,
    url: string,
    language: string,
    genres: Array<string>,
    status: string,
    runtime: number,
    averageRuntime: number,
    premiered: string,
    ended: string,
    officialSite: string,
    schedule: Schedule,
    rating: Rating,
    weight: number,
    network: Network,
    webChannel: string,
    dvdCountry: string,
    externals: Externals,
    image: ImageBitmap,
    summary: string,
    updated: number,
    _links: any,
    favorite: boolean 
}
