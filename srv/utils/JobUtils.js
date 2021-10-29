module.exports = {
    remainingDay(job){

        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
    
            const createdDate = new Date(job.created_at)
            const dueDay = createdDate.getDate() + Number(remainingDays)
            const dueDate = createdDate.setDate(dueDay)
    
            const timeInMill = dueDate - Date.now()
    
            const dayinMill = 1000 * 60 * 60 * 24
    
            const DiffDay = Math.ceil(timeInMill / dayinMill)
    
            return DiffDay
        
    },
    calcTotalJob: (job, valueHour) => valueHour * job["total-hours"]
}