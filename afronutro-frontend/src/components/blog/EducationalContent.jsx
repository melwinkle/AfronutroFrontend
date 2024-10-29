import React, { useEffect, useMemo,useRef } from "react";
import { Link } from "react-router-dom";
import citrus from "../../assets/images/citrus.png";
import CustomButton from "../common/CustomButton";
import TabSection from "../common/TabSection";
import ContentCard from "../common/ContentCard";
import fruits from "../../assets/images/fruitsv1.png";
import { useSelector, useDispatch } from "react-redux";
import { fetchEducationalContent } from "../../redux/slices/contentSlice";
import Empty from "../common/Empty";

const EducationalContent = () => {
  const dispatch = useDispatch();
  const { contentList, loading, error } = useSelector((state) => state.content);
  const fetchContent=useRef(false);
  
  // Fetch content on mount
  useEffect(() => {
    if(!fetchContent.current){
      dispatch(fetchEducationalContent());
      fetchContent.current=true;
      }

  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Get the first content item for the hero section
  const heroContent = contentList[0] || {
    title: "The Science behind Citrus and the Tang",
    description: "What is the need for tangy orange, lemon or lime taste?",
    content_id: 1
  };

  const tabContent = [
    {
      label: "All",
      content: (
        <div >
          {contentList.length > 0 ? (
            contentList.map((content) => (
              <ContentCard 
                key={content.content_id}
                title={content.title} 
                img={fruits} 
                id={content.content_id}
              >
                {content.description}
              </ContentCard>
            ))
          ) : (
            <Empty />
          )}
        </div>
      ),
    },
    {
      label: "Text",
      content: (
        <div>
          {contentList.filter(content => content.content_type === 'text').length > 0 ? (
            contentList
              .filter(content => content.content_type === 'text')
              .map((content) => (
                <ContentCard 
                  key={content.content_id}
                  title={content.title} 
                  img={fruits} 
                  id={content.content_id}
                >
                  {content.description}
                </ContentCard>
              ))
          ) : (
            <Empty />
          )}
        </div>
      ),
    },
    {
      label: "Video",
      content: (
        <div>
          {contentList.filter(content => content.content_type === 'video').length > 0 ? (
            contentList
              .filter(content => content.content_type === 'video')
              .map((content) => (
                <ContentCard 
                  key={content.content_id}
                  title={content.title} 
                  img={fruits} 
                  id={content.content_id}
                >
                  {content.description}
                </ContentCard>
              ))
          ) : (
            <Empty />
          )}
        </div>
      ),
    },
    {
      label: "Image",
      content: (
        <div>
          {contentList.filter(content => content.content_type === 'image').length > 0 ? (
            contentList
              .filter(content => content.content_type === 'image')
              .map((content) => (
                <ContentCard 
                  key={content.content_id}
                  title={content.title} 
                  img={fruits} 
                  id={content.content_id}
                >
                  {content.description}
                </ContentCard>
              ))
          ) : (
            <Empty />
          )}
        </div>
      ),
    },
  ];

  const filters = [
    { label: 'Last Added', value: 'last_added' },
    { label: 'Recommended', value: 'recommended' },
  ];

  return (
    <div>
      <div className="bg-[url('assets/images/citrus.png')] bg-cover bg-center h-52 md:h-96 w-full space-y-1 flex flex-col justify-end px-4 pb-8">
        <div className="md:w-1/2">
          <h1 className="font-bold text-afro-brown text-3xl md:text-5xl">
            {heroContent.title}
          </h1>
          <p className="text-afro-gray-mid">
            {heroContent.description}
          </p>
          <Link to={`/blog/${heroContent.content_id}`}>
            <CustomButton variant="secondary" length="cta">
              Read Article
            </CustomButton>
          </Link>
        </div>
      </div>
      <div>
        <div>
          <div className="p-4 w-full h-screen">
            <TabSection 
              tabs={tabContent} 
              filters={filters}
              contentList={contentList}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalContent;