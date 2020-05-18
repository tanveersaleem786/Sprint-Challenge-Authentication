const supertest = require("supertest")
const server = require('../api/server.js')
const db = require("../database/dbConfig.js")


describe("User Integration tests", () => {

   
    afterAll( async () => {
        await db.destroy()
    })

    it("register", async () => {
        await db("users").truncate()
        await db("sessions").truncate()
        const payload = {
            username: "amir",
            password: "123"           
        }
        const res = await supertest(server).post("/api/auth/register/").send(payload)
        expect(res.status).toBe(201)
        expect(res.type).toBe("application/json")
        expect(res.body.username).toBe("amir")
    })

    // it("Register Already Exist /api/auth/register", async () => {
    //     const payload = {
    //         username: "amir",
    //         password: "123"           
    //     }
    //     const res = await supertest(server).post("/api/auth/register/").send(payload)      
    //     expect(res.statusCode).toBe(409)        
 
    //  })

    it("login", async () => {
        const payload = {
            username: "amir",
            password: "123"           
        }
        const res = await supertest(server).post("/api/auth/login/").send(payload)
        expect(res.status).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("Welcome amir!")
    })

    it("login Invalid Credentials", async () => {
        const payload = {
            username: "amira",
            password: "123"           
        }
        const res = await supertest(server).post("/api/auth/login/").send(payload)
        expect(res.status).toBe(401)       
    })

})