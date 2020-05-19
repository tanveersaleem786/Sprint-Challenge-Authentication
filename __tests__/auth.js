const supertest = require("supertest")
const server = require('../api/server.js')
const db = require("../database/dbConfig.js")

const payload = {
    username: "tanveer",
    password: "123"           
}

describe("User Integration tests", () => {
  
  afterAll( async () => {
    await db.destroy()
  })
  

    it("Register", async () => {

        await db.seed.run()     
       
        const res = await supertest(server).post("/api/auth/register/").send(payload)
        expect(res.status).toBe(201)
        expect(res.type).toBe("application/json")
        expect(res.body.username).toBe("tanveer")
   })

    it("Register Already Exist /api/auth/register", async () => {
        
        const res = await supertest(server).post("/api/auth/register/").send(payload)      
        expect(res.statusCode).toBe(409)        
 
     })

    it("login", async () => {
     
        const res = await supertest(server).post("/api/auth/login/").send(payload)
        expect(res.status).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("Welcome tanveer!")
    })

    it("login Invalid Credentials", async () => {
        const payload = {
            username: "tan",
            password: "123"           
        }
        const res = await supertest(server).post("/api/auth/login/").send(payload)
        expect(res.status).toBe(401)       
    })

})