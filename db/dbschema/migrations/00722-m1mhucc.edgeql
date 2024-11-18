CREATE MIGRATION m1mhucc2pv7uj7rvbudop2xa6usfchgqf6xuspk5ycs3sfexf5nzsa
    ONTO m1iuovwpxt5pwmrwash36wv5wdgriwqfgfsuqz2qj6ysaxyntowmva
{
  ALTER TYPE sys_core::SysAppHeader {
      CREATE LINK codeIcon: sys_core::SysCode;
  };
};
