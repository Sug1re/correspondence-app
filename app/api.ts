import { HiSchool } from "./types";

export const getHiSchool = async (): Promise<HiSchool[]> => {
    const res = await fetch("http://localhost:4002/HiSchool",{
        cache: "no-store",//SSR
    });
    const HiSchool = res.json();

    return HiSchool;
};