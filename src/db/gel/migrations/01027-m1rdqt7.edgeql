CREATE MIGRATION m1rdqt7b47hpbsok5boxp5evzmu74enbnm6k4sxdrztcmguf37kq6q
    ONTO m1s5nye664k2ogy2myikt6bir6nor5x7p2s5qgu3aukker4fswoina
{
  ALTER TYPE sys_core::SysNodeObj {
      ALTER LINK codeQueryOwnerId {
          RENAME TO codeQueryOwnerIdType;
      };
  };
};
