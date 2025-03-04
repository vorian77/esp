CREATE MIGRATION m12k6yh7ff74aya7t2erkgdkaavqnhhfpp624lrdondh3bnlwbhkya
    ONTO m1ag23m6p256ckxvzcfn24j57ovbxavez2q2nx2cuztkfpcjhlwimq
{
                  ALTER TYPE sys_rep::SysRepElCol {
      CREATE LINK codeDataType: sys_core::SysCode;
  };
};
