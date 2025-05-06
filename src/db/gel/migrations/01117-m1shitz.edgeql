CREATE MIGRATION m1shitziva6wxkbpohnvhtuqenbbixifhnjk7cgyledadc73n32nda
    ONTO m1pm5nvankimiqp553yld3kelqqybevm64j35x3fh77rzhsf3rvwpq
{
  ALTER TYPE default::SysError {
      CREATE PROPERTY errCode: std::str;
  };
};
