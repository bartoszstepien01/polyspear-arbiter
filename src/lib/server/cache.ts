import { createClient, type RedisClientType } from 'redis';

let client: RedisClientType | undefined;

export const initializeClient = async (url: string) => {
    client = createClient({
        url: url,
    });

    await client.connect();
};

export const withCache = async (fn: () => Promise<any>, entryName: string) => {
    const cached = await client?.get(entryName);
    if (cached) return JSON.parse(cached);

    const dbResponse = JSON.stringify(await fn());
    await client?.set(entryName, dbResponse);

    return JSON.parse(dbResponse);
};

export const deleteCache = async (entryName: string) => await client?.del(entryName);