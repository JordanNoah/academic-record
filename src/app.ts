import {Server} from "./presentation/server";
import env from "./shared/env";
(()=> {
    console.log(env)
    main()
})()


function main() {
    new Server({}).start()
}
