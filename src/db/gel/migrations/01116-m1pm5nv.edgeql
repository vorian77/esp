CREATE MIGRATION m1pm5nvankimiqp553yld3kelqqybevm64j35x3fh77rzhsf3rvwpq
    ONTO m152pd7vq4f7khozg6k2d3vhmjfy3bewvb7lurduztxrbgdo2xqdrq
{
  ALTER TYPE default::SysError {
      ALTER PROPERTY errMsg {
          RENAME TO errMsgSystem;
      };
  };
};
