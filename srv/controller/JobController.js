const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    
   async create(req, res){
        await Job.get()
        await Job.create({
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
            created_at: new Date() 
        })

        return res.redirect('/')
    },

    save(req, res){
       return res.render('job')
    },

  async show(req, res){
        const jobs = await Job.get()
        const profile = await Profile.get()

        const jobId = req.params.id
        const job = jobs.find(job => job.id == jobId)

        if(!job){
            return res.send('Job not found!')
        }

        job.budget = JobUtils.calcTotalJob(job, profile['hour-value'])

        return res.render('job-edit', {job})
    },

   async update(req, res){
        const jobId = req.params.id

        const updatedJob = {
            
            name: req.body.name,
            'total-hours': req.body['total-hours'],
            'daily-hours': req.body['daily-hours'],
        }


        Job.update(updatedJob, jobId)

        res.redirect('/job/' + jobId)

    },

   async delete(req, res) {
        const jobs = await Job.get()
        const jobId = req.params.id

        Job.delete(jobId)


        return res.redirect('/')
    }
}