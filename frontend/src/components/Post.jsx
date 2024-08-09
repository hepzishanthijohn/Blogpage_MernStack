import {format} from "date-fns";
import {Link} from "react-router-dom";

export default function Post({_id,title,summary,image,content,createdAt,author}) {
    const shortDescription = summary.length > 145 ? summary.substr(0, 145) +'...' : summary;
    const postTitle = title.length > 30 ? title.substr(0, 30) +'...' : title; 
  

  return (
    <>
    {/* <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={`http://localhost:6000/${cover}`} alt=""/>
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
        <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author">{author}</a>
          <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div> */}
    <article className="post">
        
    <div className="post__thumbnail">
      <Link to={`/post/${_id}`}>
        <img src={image} alt=""/>
      </Link>
    </div>
    <div className="post__content">
      <Link to={`/post/${_id}`}>
      <h2>{postTitle}</h2>
      </Link>
      
      <p>{shortDescription}</p>
      <p className="post__footer">
        <a className="author">{author}</a>
        <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
      </p>

    </div>
 
  </article>
    </>
  );
}