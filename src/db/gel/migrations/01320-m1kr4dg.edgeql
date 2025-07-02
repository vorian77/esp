CREATE MIGRATION m1kr4dgxt3ywkdyqw53lgdyb5tvjiaydeay2h2sayagtzxm3hfynra
    ONTO m16y4wjtqq4yfvd5kxqgadf2wvym3gv4oraxnahjn2yig4g3dy6ywq
{
  ALTER TYPE sys_core::ObjRoot {
      ALTER PROPERTY isGlobalResource {
          SET default := false;
      };
  };
};
