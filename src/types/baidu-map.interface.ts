// https://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-placeapi
export interface SearchPlaceInput {
  // 检索关键字。行政区划区域检索不支持多关键字检索。如果需要按POI分类进行检索，请将分类通过query参数进行设置，如query=美食
  query: string;
  // 检索分类偏好，与q组合进行检索，多个分类以","分隔（POI分类），如果需要严格按分类检索，请通过query参数设置
  tag?: string;

  // region或location必需传一个
  // region和city_limit为行政区划区域检索参数，location和radius和radius_limit为圆形区域检索参数
  // 检索行政区划区域（增加区域内数据召回权重，如需严格限制召回数据在区域内，请搭配使用city_limit参数），可输入行政区划名或对应cityCode
  region?: string;
  // 区域数据召回限制，为true时，仅召回region对应区域内数据。
  city_limit?: string;
  // 圆形区域检索中心点，不支持多个点
  location?: string;
  // 圆形区域检索半径，单位为米。（增加区域内数据召回权重，如需严格限制召回数据在区域内，请搭配使用radius_limit参数），当半径过大，超过中心点所在城市边界时，会变为城市范围检索，检索范围为中心点所在城市
  radius?: string;
  // 是否严格限定召回结果在设置检索半径范围内。true（是），false（否）。设置为true时会影响返回结果中total准确性及每页召回poi数量， 设置为false时可能会召回检索半径外的poi。
  radius_limit?: string;

  output?: 'json' | 'xml';
  // 检索结果详细程度。取值为1 或空，则返回基本信息；取值为2，返回检索POI详细信息
  scope?: '1' | '2';
  // 检索过滤条件。当scope取值为2时，可以设置filter进行排序。
  // industry_type：行业类型，注意：设置该字段可提高检索速度和过滤精度，取值有： hotel（宾馆）；cater（餐饮）；life（生活娱乐） sort_name：排序字段，根据industry_type字段的值而定。 1、industry_type为hotel时，sort_name取值有： default（默认）；price（价格）；total_score（好评）；level（星级）；health_score（卫生）；distance（距离排序，只有圆形区域检索有效） 2、industry_type为cater时，sort_name取值有： default（默认）；taste_rating（口味）；price（价格）；overall_rating（好评）；service_rating（服务）；distance（距离排序，只有圆形区域检索有效） 3、industry_type为life时，sort_name取值有： default（默认）；price（价格）；overall_rating（好评）；comment_num（服务）；distance（距离排序，只有圆形区域检索有效）
  // sort_rule：排序规则：0（从高到低），1（从低到高）
  // price_section：价格区间
  // groupon：是否有团购：1（有），0（无）
  // discount：是否有打折：1（有），0（无）
  filter?: string;
  // 坐标类型，1（wgs84ll即GPS经纬度），2（gcj02ll即国测局经纬度坐标），3（bd09ll即百度经纬度坐标），4（bd09mc即百度米制坐标）注："ll为小写LL"
  coord_type?: 1 | 2 | 3 | 4;
  page_size?: number;
  page_num?: number;
  ak: string;
  photo_show?: boolean;
  //   query传入结构化地址（如：上地十街10号），检索结果返回数据的类型。若不传入该字段，默认召回门址数据，仅当address_result=false时，召回相应的POI数据
  address_result?: string;
}

// https://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-placeapi
export interface SearchPlaceOutput {
  status: number;
  message: string;
  total: number;
  result_type: string;
  results: SearchPlaceResult[];
}

export interface SearchPlaceResult {
  name: string;
  location: string;
  address: string;
  province: string;
  city: string;
  area: string;
  adcode: number;
  telephone: string;
  uid: string;
  detail: string;
  detail_info: {
    distance: number;
    type: string;
    tag: string;
    detail_url: string;
    price: string;
    shop_hours: string;
    overall_rating: string;
    taste_rating: string;
    environment_rating: string;
    content_tag: string;
    brand: string;
  };
}

// https://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding
export interface GetGeoCodingInput {
  address: string;
  ak: string;
  city?: string;
  output?: 'json' | 'xml';
  extension_analys_level?: string;
}

// https://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding
export interface GetGeoCodingOutput {
  status: number;
  result: GetGeoCodingResult;
}

export interface GetGeoCodingResult {
  location: { lat: number; lng: number };
  // 位置的附加信息，是否精确查找。1为精确查找，即准确打点；0为不精确，即模糊打点。
  precise: 0 | 1;
  // 描述打点绝对精度（即坐标点的误差范围）。
  // confidence=100，解析误差绝对精度小于20m；
  // confidence≥90，解析误差绝对精度小于50m；
  // confidence≥80，解析误差绝对精度小于100m；
  // confidence≥75，解析误差绝对精度小于200m；
  // confidence≥70，解析误差绝对精度小于300m；
  // confidence≥60，解析误差绝对精度小于500m；
  // confidence≥50，解析误差绝对精度小于1000m；
  // confidence≥40，解析误差绝对精度小于2000m；
  // confidence≥30，解析误差绝对精度小于5000m；
  // confidence≥25，解析误差绝对精度小于8000m；
  // confidence≥20，解析误差绝对精度小于10000m；
  confidence: number;
  // 描述地址理解程度。分值范围0-100，分值越大，服务对地址理解程度越高（建议以该字段作为解析结果判断标准）；
  // 当comprehension值为以下值时，对应的准确率如下：
  // comprehension=100，解析误差100m内概率为91%，误差500m内概率为96%；
  // comprehension≥90，解析误差100m内概率为89%，误差500m内概率为96%；
  // comprehension≥80，解析误差100m内概率为88%，误差500m内概率为95%；
  // comprehension≥70，解析误差100m内概率为84%，误差500m内概率为93%；
  // comprehension≥60，解析误差100m内概率为81%，误差500m内概率为91%；
  // comprehension≥50，解析误差100m内概率为79%，误差500m内概率为90%；
  comprehension: number;
  // 可以打点到地址文本中的真实地址结构，
  level: string;
  // 可以解析地址文本中的最小地址结构，
  analys_level: string;
}
