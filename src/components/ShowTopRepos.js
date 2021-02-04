function ShowTopRepos(props) {
  return (
    <div className="ui centered cards">
      {props.allRepos.map((repos) => (
        <div className="ui card" key={repos.name}>
          <div className="image">
            <img src={repos.owner.avatar_url} alt="repo_logo" />
          </div>
          <div className="content">
            <a href={repos.html_url} className="header">
              {repos.name}
            </a>
            <div className="meta">
              <span className="date">
                Joined in {repos.created_at.slice(0, 4)}
              </span>
            </div>
            <div className="description">{repos.description}</div>
          </div>
          <div className="extra content">
            <i className="star yellow icon"></i>
            {repos.stargazers_count} stars
          </div>
        </div>
      ))}
    </div>
  );
}
export default ShowTopRepos;
