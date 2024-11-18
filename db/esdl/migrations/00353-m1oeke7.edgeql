CREATE MIGRATION m1oeke77tfnnq3t7zdghund4ulji2oene5n4sterlacgglrxp45qqa
    ONTO m1j6fuzpxg52yxxeheflbseqq5ycqctmc7cbr22jkwhu5kwvrcpzia
{
      ALTER TYPE sys_rep::SysRepUserParm {
      ALTER PROPERTY value {
          RENAME TO parmValue;
      };
  };
};
