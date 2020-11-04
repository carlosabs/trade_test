using System;
using System.Linq;
using System.Web.Http;
using AngularAPI.Models;

namespace AngularAPI.Controllers
{
    [RoutePrefix("Api/User")]
    public class UserAPIController : ApiController
    {
        AngularDBEntities objEntity = new AngularDBEntities();
        
        [HttpGet]
        [Route("GetUserDetails")]
        public IQueryable<Trade> GetUser()
        {
            try
            {
                var trades = objEntity.Trades;
                return trades;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        [Route("GetUserDetailsById/{userId}")]
        public IHttpActionResult GetUserById(string userId)
        {
            var objUser = new Trade();
            int ID = Convert.ToInt32(userId);
            try
            {
                objUser = objEntity.Trades.Find(ID);
                if (objUser == null)
                {
                    return NotFound();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return Ok(objUser);
        }

        [HttpPost]
        [Route("InsertUserDetails")]
        public IHttpActionResult PostUser(Trade data)
        {
            string message = "";
            if (data != null)
            {

                try
                {
                    objEntity.Trades.Add(data);
                    int result = objEntity.SaveChanges();
                    if (result > 0)
                    {
                        message = "User has been sussfully added";
                    }
                    else
                    {
                        message = "faild";
                    }
                }
                catch (Exception)
                {
                    throw;
                }
            }

            return Ok(message);
        }

        [HttpPut]
        [Route("UpdateEmployeeDetails")]
        public IHttpActionResult PutUserMaster(Trade user)
        {
            string message = "";
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            try
            {
                var objUser = objEntity.Trades.Find(user.UserId);

                if (objUser != null)
                {
                    objUser = user;

                }

                int result = objEntity.SaveChanges();

                if (result > 0)
                {
                    message = "User has been sussfully updated";
                }
                else
                {
                    message = "faild";
                }

            }
            catch (Exception)
            {
                throw;
            }

            return Ok(message);
        }

        [HttpDelete]
        [Route("DeleteUserDetails")]
        public IHttpActionResult DeleteEmaployeeDelete(int id)
        {
            string message = "";
            var user = objEntity.Trades.Find(id);
            objEntity.Trades.Remove(user);

            int result = objEntity.SaveChanges();
            if (result > 0)
            {
                message = "User has been sussfully deleted";
            }
            else
            {
                message = "faild";
            }
            return Ok(message);
        }
    }
}
