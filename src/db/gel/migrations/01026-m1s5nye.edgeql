CREATE MIGRATION m1s5nye664k2ogy2myikt6bir6nor5x7p2s5qgu3aukker4fswoina
    ONTO m1srfmlrg55q3fczngxormfzls2ic5hjmkdmwykx7kqezry2ztmv5q
{
  ALTER TYPE sys_core::SysNodeObj {
      ALTER LINK codeTreeLeafId {
          RENAME TO codeQueryOwnerId;
      };
  };
};
