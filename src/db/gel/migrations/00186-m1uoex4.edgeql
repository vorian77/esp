CREATE MIGRATION m1uoex44vl2zkqybmqtmierclfuyblblegwsochanriyxznifophnq
    ONTO m144tm7rmx2o7dsywlrdyvaexmnyehe3zjixsiahyj24dx5io5htxq
{
                              ALTER TYPE sys_core::SysDataObj {
      CREATE PROPERTY listOrderField: std::str;
  };
};
