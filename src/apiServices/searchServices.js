import * as request from '~/utils/request';

 export const search = async (q, type = 'more') => {
    try {
     const res = await request.get('users',{ 
         params: {
             q,
             type,
            },
        });
        console.log(res);
        return res;

    } catch (error) {
        console.log(error);
    }
};

