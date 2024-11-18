CREATE MIGRATION m1nuuhlk3gcheig2yclljh6odpl3ljwgr6gpxqlqddczfmokcb5naq
    ONTO m1sy2okyhzsdv2bkyckfn6a7xxke3d7vg2nn6db3ujm5mrqf7ojv7q
{
  ALTER TYPE default::Test {
      CREATE PROPERTY jsonProp3: std::json;
      CREATE PROPERTY jsonProp4: std::json;
  };
};
