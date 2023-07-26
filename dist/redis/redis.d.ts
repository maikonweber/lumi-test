import Redis from 'ioredis';
export declare class RedisService extends Redis {
    constructor();
    addNode(id: string, name: string): Promise<void>;
    addEdge(nodeId: string, connectedNodeId: string): Promise<void>;
    getNodeName(id: string): Promise<string>;
    getConnectedNodes(nodeId: string): Promise<string[]>;
    getAllNodes(): Promise<{
        [id: string]: string;
    }>;
    deleteNode(id: string): Promise<number>;
    deleteEdge(nodeId: string, connectedNodeId: string): Promise<number>;
    getNodeCount(): Promise<number>;
    getEdgeCount(nodeId: string): Promise<number>;
    getAllEdges(): Promise<{
        [nodeId: string]: string[];
    }>;
    getAllNodeIds(): Promise<string[]>;
    isConnected(nodeId: string, connectedNodeId: string): Promise<boolean>;
    setKeyValue(key: string, value: string): Promise<void>;
    getKey(key: string): Promise<string | null>;
    deleteKey(key: string): Promise<number>;
    hashSet(key: string, field: string, value: string): Promise<number>;
    hashGet(key: string, field: string): Promise<string | null>;
    hashGetAll(key: string): Promise<{
        [field: string]: string;
    }>;
    hashDelete(key: string, field: string): Promise<number>;
    setAdd(key: string, member: string): Promise<number>;
    setMembers(key: string): Promise<string[]>;
    setRemove(key: string, member: string): Promise<number>;
    keyExists(key: string): Promise<number>;
    expireKey(key: string, seconds: number): Promise<number>;
    ttlKey(key: string): Promise<number>;
    subtractValueFromKey(key: string, valueToSubtract: number): Promise<number | null>;
}
