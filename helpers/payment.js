const apiKey = process.env.XENDITAPIKEY;
const axios = require('axios');

const makeSubscription = async(userId,userData,amount,recurPlan) => {
    const {firstName,lastName,email} = userData;
    
    try {
        // console.log(amount,recurPlan);
        let customerId;
        // console.log(userId);
        const getCustomer = await axios.get(`https://api.xendit.co/customers?reference_id=${userId}`, {
            auth: {
                username:apiKey
            }
        });
        // console.log(getCustomer.data.data, "<<<<<<  GETCUSTOMER");
        if(!getCustomer.data.data.length) {
            const customerData = {
                reference_id:userId,
                type:"INDIVIDUAL",
                email,
                individual_detail: {
                    given_names:firstName,
                    surname:lastName
                }
            }
    
            const makeCustomer = await axios.post("https://api.xendit.co/customers", customerData, {
                auth: {
                    username:apiKey
                }
            })
            // console.log(makeCustomer, "<<<<<< MAKECUSTOMER");
            customerId = makeCustomer.data;
        } else {
            customerId = getCustomer.data.data[0];
        }
        // console.log(customerId.id, "<<<< MAKE CUSTOMER DATA");
        // console.log(getCustomer.data, "<<<< MAKE CUSTOMER DATA");

        const planstRef = "plans_"+userId;
        const scheduleRef = "schedule_"+userId;

        const plansData = {
            reference_id:planstRef,
            customer_id:customerId.id, 
            recurring_action:"PAYMENT",
            currency:"IDR",
            amount,
            immediate_action_type:"FULL_AMOUNT",
            failed_cycle_action:"STOP",
            schedule: {
              reference_id:scheduleRef,
              retry_interval:"DAY",
              retry_interval_count:1,
              total_retry:5,
              interval:recurPlan,
              interval_count:1,
              total_recurrence:10
            },
            success_return_url:"https://www.google.com",
            failure_return_url:"https://www.google.com"
          }
        // console.log(plansData);

        // const planstJson = JSON.stringify(plansData);
        // console.log(planstJson);

        const plans = await axios.post("https://api.xendit.co/recurring/plans", plansData, {
            auth: {
                username:apiKey
            }
        })
        // console.log(plans.data, "<<<<< PLANS DATA");
        return {id:plans.data.id, action:plans.data.actions}
        // return true;
        
    } catch (error) {
        throw error;
    }
}

const cancelSubscription = async(plansId) => {
    try {
        const response = await axios.post(
            `https://api.xendit.co/recurring/plans/${plansId}/deactivate`,
            {},{
                auth: {
                    username:apiKey
                }
            }
        )
        console.log(response);
        res.status(200).json({message:"Subscription has been canceled", id:plansId});
    } catch (error) {
        throw error;
    }
}

module.exports = makeSubscription;