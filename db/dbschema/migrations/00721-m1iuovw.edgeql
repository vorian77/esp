CREATE MIGRATION m1iuovwpxt5pwmrwash36wv5wdgriwqfgfsuqz2qj6ysaxyntowmva
    ONTO m1vurueqo3wkornj7nornm75ttowuylgvct6psw2cncr42hyw2udna
{
  ALTER TYPE sys_core::SysAppHeader {
      DROP LINK codeIcon;
  };
};
