CREATE MIGRATION m1qhpchgqt5p6jjxxrzv2pkifahobwyspvsjwkkdcfqyssa3pyohra
    ONTO m1juxzflogvzignugbvdcltakdpxzzu4kck7pdbv5d3mky3cmdwxta
{
  ALTER TYPE sys_core::SysAttrAccess {
      ALTER LINK obj {
          RENAME TO objs;
      };
  };
};
