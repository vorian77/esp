CREATE MIGRATION m1ycocqsckxbzym6sg3isevqjwotaxqhswsp2pg4ivizv32psisxda
    ONTO m1hzcdkcysedfyhiamtjseke2cvqd2kg6y7nzunxbboyx3il7tzk2a
{
  ALTER TYPE sys_core::SysDataObj {
      CREATE LINK codeDoDetailType: sys_core::SysCode;
  };
};
