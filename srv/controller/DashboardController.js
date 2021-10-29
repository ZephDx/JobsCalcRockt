const Job = require('../model/Job')
const Profile = require('../model/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {
   async index(req,res) {
        const jobs = await Job.get()
        const profile = await Profile.get()
        const statusCount = {
            progress: 0,
            done: 0, 
            total: jobs.length
        }


        let jobTotalHours = 0

        const updateJobs = jobs.map((job) => {
            const Less1 = JobUtils.remainingDay(job)
            const status = Less1 <= 0 ? "done": "progress"

            statusCount[status] += 1 

            

            jobTotalHours = status === 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours
            


            return{
                ...job,
                Less1,
                status,
                budget: JobUtils.calcTotalJob(job, profile['hour-value'])
    
            }
        })

        const freeHours = profile["hours-per-day"] - jobTotalHours

        
        
        return res.render('index', {jobs: updateJobs, profile: profile, statusCount:statusCount, freeHours:freeHours})
    
    }
}