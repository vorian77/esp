CREATE MIGRATION m1kaqzhfkymihtj2zuubjfuehqxwpe57iwwhmwgghcvi25humeslgq
    ONTO m1i4zpwgwc4nidj3xtrro2b7qvtx2ltkjvonusmo6eba2pi6gj5nza
{
              ALTER TYPE sys_core::SysAppHeader {
      CREATE LINK codeIcon: sys_core::SysCode;
  };
};
