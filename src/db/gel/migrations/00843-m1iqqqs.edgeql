CREATE MIGRATION m1iqqqsicqcgv7uzu3vn3sbxcpkliypaaseavotk6345f3jbjtcqjq
    ONTO m16u6acosoihjlqqytxle6use3x77zurc5ezb7rjib3nwseug2y57a
{
          ALTER TYPE sys_user::SysTask {
      CREATE LINK targetDataObj: sys_core::SysDataObj;
      CREATE LINK targetNodeObj: sys_core::SysNodeObj;
  };
};
