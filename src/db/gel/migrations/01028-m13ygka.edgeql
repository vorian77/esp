CREATE MIGRATION m13ygka4pnuccqup2qya3wxebwoots4imf6csofxfrxeeujbjnmwla
    ONTO m1rdqt7b47hpbsok5boxp5evzmu74enbnm6k4sxdrztcmguf37kq6q
{
  ALTER TYPE sys_core::SysNodeObj {
      ALTER LINK codeQueryOwnerIdType {
          RENAME TO codeQueryOwnerType;
      };
  };
};
