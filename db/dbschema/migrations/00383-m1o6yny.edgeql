CREATE MIGRATION m1o6yny6mpscixrknk6baioeythuxomqylbqiaczv5pckvdmnkj2va
    ONTO m12k6yh7ff74aya7t2erkgdkaavqnhhfpp624lrdondh3bnlwbhkya
{
  ALTER TYPE sys_rep::SysRepEl {
      CREATE LINK codeDataType: sys_core::SysCode;
      CREATE REQUIRED LINK codeType: sys_core::SysCode {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
      CREATE LINK column: sys_db::SysColumn;
      CREATE PROPERTY expr: std::str;
  };
  DROP TYPE sys_rep::SysRepElCol;
};
