CREATE MIGRATION m1j6fuzpxg52yxxeheflbseqq5ycqctmc7cbr22jkwhu5kwvrcpzia
    ONTO m1b4swb6o5v6g7s5na77nusha3kmhp4ilulu6osm2kreq2c7bxi3ta
{
                  ALTER TYPE sys_core::SysDataObjFieldListSelect {
      ALTER PROPERTY btnLabelComplete {
          RESET OPTIONALITY;
      };
  };
};
