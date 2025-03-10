CREATE MIGRATION m1hzcdkcysedfyhiamtjseke2cvqd2kg6y7nzunxbboyx3il7tzk2a
    ONTO m173zlfqowlsjbipgauyxdtwmibvd2p6j7lw3knrr6jbdk63xrnw4q
{
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE LINK codeAttrObjsSource: sys_core::SysCode;
  };
};
