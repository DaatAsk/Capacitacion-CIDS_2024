import app from "./app"
import dataSource from "./db";

async function main() {
    const PORT = 3000;
    try {
        dataSource.initialize()
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

main()