import React, { useEffect, useMemo,useRef,useState } from "react";
import { Link } from "react-router-dom";
import citrus from "../../assets/images/citrus.png";
import CustomButton from "../common/CustomButton";
import TabSection from "../common/TabSection";
import ContentCard from "../common/ContentCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchEducationalContent } from "../../redux/slices/contentSlice";
import Empty from "../common/Empty";
import PaginatedComponent from "../navigation/Pagination";

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

  

  // Get the first content item for the hero section
  const heroContent = contentList[0] || {
    title: "The Science behind Citrus and the Tang",
    description: "What is the need for tangy orange, lemon or lime taste?",
    content_id: 1
  };
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // paginated content list
  const paginatedContentList = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return contentList.slice(startIndex, startIndex + pageSize);
  }, [contentList, currentPage, pageSize]);

  const tabContent = [
    {
      label: "All",
      content: (
        <div >
          {paginatedContentList.length > 0 ? (
            paginatedContentList.map((content) => (
              <ContentCard 
                key={content.content_id}
                title={content.title} 
                img={content.content_image} 
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
      label: "Blog",
      content: (
        <div>
          {paginatedContentList.filter(content => content.content_type === 'blog').length > 0 ? (
            paginatedContentList
              .filter(content => content.content_type === 'blog')
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
          {paginatedContentList.filter(content => content.content_type === 'video').length > 0 ? (
            paginatedContentList
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
          {paginatedContentList.filter(content => content.content_type === 'image').length > 0 ? (
            paginatedContentList
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

  if (loading) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {[1, 2, 3].map((placeholder) => (
        <div key={placeholder} className="border rounded-lg p-4 animate-pulse">
          <div className="w-full h-48 bg-gray-200 rounded-md"></div>
          <div className="h-4 bg-gray-200 rounded mt-4 w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded mt-2 w-1/2"></div>
        </div>
      ))}
    </div>
  );
  if (error) return <p><Empty/></p>;
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
              contentList={paginatedContentList}
            />
            <PaginatedComponent
              totalPages={Math.ceil(contentList.length / pageSize)}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />

          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalContent;