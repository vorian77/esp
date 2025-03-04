CREATE MIGRATION m16u6acosoihjlqqytxle6use3x77zurc5ezb7rjib3nwseug2y57a
    ONTO m1qdrddcc2qelk6shfydqh5u7xzvzp6qgysdzde5pbksnzv57to5qa
{
          ALTER TYPE sys_user::SysTask {
      DROP LINK targetDataObj;
      DROP LINK targetNodeObj;
  };
};
