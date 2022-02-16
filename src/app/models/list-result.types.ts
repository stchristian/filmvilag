export interface MovieListResult {
    poster_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
    original_title: string;
    genre_ids: number[];
    id: number;
    media_type: "movie";
    original_language: string;
    title: string;
    backdrop_path: string;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
}

export interface TvListResult {
    poster_path: string;
    popularity: number;
    id: number;
    overview: string;
    backdrop_path: string;
    vote_average: number;
    media_type: "tv";
    first_air_date: string;
    origin_country: any[];
    genre_ids: number[];
    original_language: string;
    vote_count: number;
    name: string;
    original_name: string;
}

interface KnownFor {
    poster_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
    original_title: string;
    genre_ids: number[];
    id: number;
    media_type: string;
    original_language: string;
    title: string;
    backdrop_path: string;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
}

export interface PersonListResult {
    profile_path: string;
    adult: boolean;
    id: number;
    media_type: "person";
    known_for: KnownFor[];
    name: string;
    popularity: number;
}