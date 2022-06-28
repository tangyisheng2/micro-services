export const natsWrapper = {
    client: {
        publish: jest
            .fn()
            .mockImplementation(
                (subject: string, data: string, callback: () => void) => {
                    callback();
                }
            ),
    },
};

// import nats, { Stan } from 'node-nats-streaming';

// class NatsWrapper {
//     public client: any = {};

//     constructor() {
//         this.client.publish = jest
//             .fn()
//             .mockImplementation(
//                 (subject: string, data: string, callback: () => void) => {
//                     callback();
//                 }
//             );
//     }
// }

// export const natsWrapper = new NatsWrapper();
