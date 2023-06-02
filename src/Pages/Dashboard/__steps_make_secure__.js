/**
 * ------------------
 *       BASIC
 * ------------------
 * 1. Do not show the link to those who should not see it
 *    Only show to the person/types of users who should see it
 * 2. Do not allow unauthorized persoons to visit the link by typing the URL
 *    Use AdminRoute that will check whether the user is admin or not.
 *    If not admin, redirect to any other page. You could logout user and
 *    send them to the login page as well.
 * ------------------
 *    TO SEND DATA
 * ------------------
 * 1. Verify JWT (send authorization token in the header to the server)
 *    If possible, use axios to send JWT by intercepting the request
 * 2. If it is an admin activity, make sure only admin us posting data by using
 *    verfiyAdmin
 */
