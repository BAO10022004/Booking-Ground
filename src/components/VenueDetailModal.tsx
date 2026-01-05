import { useState, useEffect } from "react";
import { Star, Heart, MapPin, Clock, Phone, ArrowLeft } from "lucide-react";
import {
  useVenue,
  useRatings,
  useVenueServices,
  useVenueTerms,
  useVenuePriceLists,
  useVenueImages,
  useCategories,
  useAuth,
} from "../hooks";
import { ratingService } from "../services";
import "../assets/styles/VenueDetailModal.css";

interface VenueDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  venueId: string | null;
  onBookClick: () => void;
}

type TabType = "services" | "images" | "terms" | "ratings";

export default function VenueDetailModal({
  isOpen,
  onClose,
  venueId,
  onBookClick,
}: VenueDetailModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("services");
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [ratingStars, setRatingStars] = useState(0);
  const [ratingReview, setRatingReview] = useState("");
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { venue, loading } = useVenue(venueId || undefined);
  const { ratings, getAverageRating, refreshRatings } = useRatings(
    venueId ? [venueId] : undefined
  );
  const {
    services,
    loading: servicesLoading,
    error: servicesError,
  } = useVenueServices(venueId || undefined);
  const {
    terms,
    loading: termsLoading,
    error: termsError,
  } = useVenueTerms(venueId || undefined);
  const {
    priceLists,
    loading: priceListsLoading,
    error: priceListsError,
  } = useVenuePriceLists(venueId || undefined);
  const { categories } = useCategories();
  const { images: layoutImages, loading: layoutImagesLoading } = useVenueImages(
    venueId || undefined,
    false
  );
  const { images: galleryImages, loading: galleryImagesLoading } =
    useVenueImages(venueId || undefined, true);

  const venueData = venue as any;

  useEffect(() => {
    if (isOpen) {
      setActiveTab("services");
      setShowRatingForm(false);
      setRatingStars(0);
      setRatingReview("");
    }
  }, [isOpen]);

  if (!isOpen || !venueId) return null;

  const averageRating = getAverageRating(venueId);
  const venueRatings = ratings.filter((r) => r.venue_id === venueId);
  const userRating = venueRatings.find((r) => r.user_id === (user as any)?.id);

  const handleSubmitRating = async () => {
    if (!isAuthenticated || !user) {
      return;
    }

    if (ratingStars === 0) {
      return;
    }

    try {
      setIsSubmittingRating(true);
      await ratingService.createRating({
        venue_id: venueId!,
        star_number: ratingStars,
        review: ratingReview.trim() || undefined,
      });
      await refreshRatings();
      setShowRatingForm(false);
      setRatingStars(0);
      setRatingReview("");
    } catch (error: any) {
    } finally {
      setIsSubmittingRating(false);
    }
  };

  return (
    <div className="venue-detail-backdrop" onClick={onClose}>
      <div
        className="venue-detail-container"
        onClick={(e) => e.stopPropagation()}
      >
        {loading ? (
          <div className="venue-detail-loading">Đang tải...</div>
        ) : venue ? (
          <>
            <div className="venue-detail-header">
              <div className="venue-detail-header-top">
                <button className="venue-detail-back" onClick={onClose}>
                  <ArrowLeft size={24} />
                </button>
                <div className="venue-detail-rating">
                  <Star size={20} fill="currentColor" />
                  <span>
                    {averageRating || "0"} ({venueRatings.length} đánh giá)
                  </span>
                </div>
                <button className="venue-detail-favorite">
                  <Heart size={20} />
                </button>
                <button className="venue-detail-book-btn" onClick={onBookClick}>
                  Đặt lịch
                </button>
              </div>
            </div>

            <div className="venue-detail-content">
              <div className="venue-detail-main-info">
                <div className="venue-detail-avatar">
                  <img src={venueData?.image || ""} alt={venue.name} />
                </div>
                <h2 className="venue-detail-name">{venue.name}</h2>
                <div className="venue-detail-categories">
                  {venueData?.categories?.map((cat: any) => (
                    <span key={cat.id} className="venue-detail-category-tag">
                      {cat.name}
                    </span>
                  ))}
                </div>
                <div className="venue-detail-meta">
                  <div className="venue-detail-meta-item">
                    <MapPin size={16} />
                    <span>{venue.address}</span>
                  </div>
                  {venue.operatingTime && (
                    <div className="venue-detail-meta-item">
                      <Clock size={16} />
                      <span>{venue.operatingTime}</span>
                    </div>
                  )}
                  {venue.phoneNumber1 && (
                    <div className="venue-detail-meta-item">
                      <Phone size={16} />
                      <span>Liên hệ - {venue.phoneNumber1}</span>
                    </div>
                  )}
                  {venue.phoneNumber2 && (
                    <div className="venue-detail-meta-item">
                      <span>Liên hệ - {venue.phoneNumber2}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="venue-detail-tabs">
                <button
                  className={`venue-detail-tab ${
                    activeTab === "services" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("services")}
                >
                  Dịch vụ
                </button>
                <button
                  className={`venue-detail-tab ${
                    activeTab === "images" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("images")}
                >
                  Hình ảnh
                </button>
                <button
                  className={`venue-detail-tab ${
                    activeTab === "terms" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("terms")}
                >
                  Điều khoản & quy định
                </button>
                <button
                  className={`venue-detail-tab ${
                    activeTab === "ratings" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("ratings")}
                >
                  Đánh giá
                </button>
              </div>

              <div className="venue-detail-tab-content">
                {activeTab === "services" && (
                  <div className="venue-detail-services">
                    {servicesLoading || priceListsLoading ? (
                      <div className="venue-detail-loading">Đang tải...</div>
                    ) : servicesError || priceListsError ? (
                      <div className="venue-detail-empty">
                        <p>Có lỗi xảy ra khi tải dữ liệu</p>
                        <p className="venue-detail-empty-note">
                          {servicesError?.message || priceListsError?.message}
                        </p>
                        <p className="venue-detail-empty-note">
                          Vui lòng kiểm tra Console để xem chi tiết lỗi
                        </p>
                      </div>
                    ) : (
                      <>
                        {priceLists && priceLists.length > 0 && (
                          <div className="venue-detail-price-lists">
                            <h3 className="venue-detail-section-title">
                              BẢNG GIÁ SÂN
                            </h3>
                            {(() => {
                              // Nhóm bảng giá theo category_id
                              const groupedByCategory = priceLists.reduce(
                                (acc: any, priceList) => {
                                  const categoryId =
                                    priceList.category_id || "no-category";
                                  if (!acc[categoryId]) {
                                    acc[categoryId] = [];
                                  }
                                  acc[categoryId].push(priceList);
                                  return acc;
                                },
                                {}
                              );

                              return Object.entries(groupedByCategory).map(
                                ([categoryId, lists]: [string, any]) => {
                                  const category = categories.find(
                                    (c) => c.categoryId === categoryId
                                  );
                                  return (
                                    <div
                                      key={categoryId}
                                      className="venue-detail-price-category-group"
                                    >
                                      {category && (
                                        <h4 className="venue-detail-price-category-name">
                                          {category.name}
                                        </h4>
                                      )}
                                      {lists.map((priceList: any) => (
                                        <div
                                          key={priceList.id}
                                          className="venue-detail-price-list"
                                        >
                                          <h5 className="venue-detail-price-list-name">
                                            {priceList.name}
                                          </h5>
                                          {priceList.currency && (
                                            <p className="venue-detail-price-list-currency">
                                              {priceList.currency}
                                            </p>
                                          )}
                                          {priceList.details &&
                                            priceList.details.length > 0 && (
                                              <div className="venue-detail-price-table">
                                                <table>
                                                  <thead>
                                                    <tr>
                                                      <th>Thứ</th>
                                                      <th>Khung giờ</th>
                                                      <th>Cố định</th>
                                                      <th>Vãng lai</th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                    {priceList.details.map(
                                                      (detail: any) => (
                                                        <tr key={detail.id}>
                                                          <td>
                                                            {detail.day || "-"}
                                                          </td>
                                                          <td>
                                                            {detail.start_time ||
                                                              ""}{" "}
                                                            -{" "}
                                                            {detail.end_time ||
                                                              ""}
                                                          </td>
                                                          <td>
                                                            {detail.fixed_price !==
                                                              undefined &&
                                                            detail.fixed_price !==
                                                              null
                                                              ? `${Number(
                                                                  detail.fixed_price
                                                                ).toLocaleString()}`
                                                              : "-"}
                                                          </td>
                                                          <td>
                                                            {detail.current_price !==
                                                              undefined &&
                                                            detail.current_price !==
                                                              null
                                                              ? Number(
                                                                  detail.current_price
                                                                ).toLocaleString()
                                                              : "-"}
                                                          </td>
                                                        </tr>
                                                      )
                                                    )}
                                                  </tbody>
                                                </table>
                                              </div>
                                            )}
                                        </div>
                                      ))}
                                    </div>
                                  );
                                }
                              );
                            })()}
                          </div>
                        )}
                        {services && services.length > 0 && (
                          <div className="venue-detail-service-lists">
                            <h3 className="venue-detail-section-title">
                              DỊCH VỤ
                            </h3>
                            {services.map((serviceList) => (
                              <div
                                key={serviceList.id}
                                className="venue-detail-price-list"
                              >
                                <h4 className="venue-detail-price-list-name">
                                  {serviceList.name}
                                </h4>
                                {serviceList.details &&
                                serviceList.details.length > 0 ? (
                                  <div className="venue-detail-price-table">
                                    <table>
                                      <thead>
                                        <tr>
                                          <th>Tên dịch vụ</th>
                                          <th>Giá sỉ</th>
                                          <th>Đơn vị sỉ</th>
                                          <th>Giá lẻ</th>
                                          <th>Đơn vị lẻ</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {serviceList.details.map((service) => (
                                          <tr key={service.id}>
                                            <td>{service.name}</td>
                                            <td>{service.wholesale || "-"}</td>
                                            <td>
                                              {service.unit_wholesale || "-"}
                                            </td>
                                            <td>{service.retail || "-"}</td>
                                            <td>
                                              {service.unit_retail || "-"}
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                ) : (
                                  <p className="venue-detail-empty-note">
                                    Chưa có dịch vụ trong danh mục này
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        {(!services || services.length === 0) &&
                          (!priceLists || priceLists.length === 0) && (
                            <div className="venue-detail-empty">
                              <p>Chưa có dịch vụ và bảng giá nào</p>
                              <p className="venue-detail-empty-note">
                                Debug: services.length = {services?.length || 0}
                                , priceLists.length = {priceLists?.length || 0}
                              </p>
                            </div>
                          )}
                      </>
                    )}
                  </div>
                )}

                {activeTab === "images" && (
                  <div className="venue-detail-images">
                    <div className="venue-detail-images-section">
                      <h4>Sơ đồ sân</h4>
                      {layoutImagesLoading ? (
                        <div className="venue-detail-loading">Đang tải...</div>
                      ) : layoutImages.length === 0 ? (
                        <p>Chưa có sơ đồ sân</p>
                      ) : (
                        <div className="venue-detail-image-grid">
                          {layoutImages.map((img) => (
                            <img
                              key={img.id}
                              src={img.image_url}
                              alt={img.name}
                              className="venue-detail-image"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="venue-detail-images-section">
                      <h4>Hình ảnh</h4>
                      {galleryImagesLoading ? (
                        <div className="venue-detail-loading">Đang tải...</div>
                      ) : galleryImages.length === 0 ? (
                        <p>Chưa có hình ảnh</p>
                      ) : (
                        <div className="venue-detail-image-grid">
                          {galleryImages.map((img) => (
                            <img
                              key={img.id}
                              src={img.image_url}
                              alt={img.name}
                              className="venue-detail-image"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "terms" && (
                  <div className="venue-detail-terms">
                    {termsLoading ? (
                      <div className="venue-detail-loading">Đang tải...</div>
                    ) : termsError ? (
                      <div className="venue-detail-empty">
                        <p>Có lỗi xảy ra khi tải dữ liệu</p>
                        <p className="venue-detail-empty-note">
                          {termsError.message}
                        </p>
                      </div>
                    ) : !terms || terms.length === 0 ? (
                      <div className="venue-detail-empty">
                        <p>Chưa có điều khoản nào</p>
                      </div>
                    ) : (
                      <>
                        {(() => {
                          const latestUpdate = terms
                            .map((t) => t.update_time)
                            .filter((t) => t)
                            .sort()
                            .reverse()[0];
                          return latestUpdate ? (
                            <div className="venue-detail-terms-update">
                              <p>
                                Cập nhật lần cuối:{" "}
                                {new Date(latestUpdate).toLocaleDateString(
                                  "vi-VN"
                                )}
                              </p>
                            </div>
                          ) : null;
                        })()}
                        <div className="venue-detail-terms-list">
                          {terms.map((term) => (
                            <div
                              key={term.id}
                              className="venue-detail-term-item"
                            >
                              <h4 className="venue-detail-term-title">
                                {term.category_name || "Điều khoản"}
                              </h4>
                              <div className="venue-detail-term-content">
                                {term.content ? (
                                  term.content
                                    .split("\n")
                                    .map((line, index) => (
                                      <p key={index}>{line || "\u00A0"}</p>
                                    ))
                                ) : (
                                  <p>Chưa có nội dung</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {activeTab === "ratings" && (
                  <div className="venue-detail-ratings">
                    {isAuthenticated && !userRating && !showRatingForm && (
                      <div className="venue-detail-rating-form-toggle">
                        <button
                          className="venue-detail-add-rating-btn"
                          onClick={() => setShowRatingForm(true)}
                        >
                          Viết đánh giá
                        </button>
                      </div>
                    )}

                    {showRatingForm && (
                      <div className="venue-detail-rating-form">
                        <h4 className="venue-detail-section-title">
                          Viết đánh giá
                        </h4>
                        <div className="venue-detail-rating-stars-input">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              className="venue-detail-star-btn"
                              onClick={() => setRatingStars(star)}
                              onMouseEnter={() => setRatingStars(star)}
                            >
                              <Star
                                size={32}
                                fill={
                                  star <= ratingStars ? "currentColor" : "none"
                                }
                                color={
                                  star <= ratingStars ? "#fbbf24" : "#d1d5db"
                                }
                              />
                            </button>
                          ))}
                        </div>
                        <textarea
                          className="venue-detail-rating-textarea"
                          placeholder="Chia sẻ trải nghiệm của bạn..."
                          value={ratingReview}
                          onChange={(e) => setRatingReview(e.target.value)}
                          rows={4}
                        />
                        <div className="venue-detail-rating-form-actions">
                          <button
                            className="venue-detail-rating-cancel-btn"
                            onClick={() => {
                              setShowRatingForm(false);
                              setRatingStars(0);
                              setRatingReview("");
                            }}
                            disabled={isSubmittingRating}
                          >
                            Hủy
                          </button>
                          <button
                            className="venue-detail-rating-submit-btn"
                            onClick={handleSubmitRating}
                            disabled={isSubmittingRating || ratingStars === 0}
                          >
                            {isSubmittingRating
                              ? "Đang gửi..."
                              : "Gửi đánh giá"}
                          </button>
                        </div>
                      </div>
                    )}

                    {userRating && (
                      <div className="venue-detail-user-rating">
                        <h4 className="venue-detail-section-title">
                          Đánh giá của bạn
                        </h4>
                        <div className="venue-detail-rating-item">
                          <div className="venue-detail-rating-header">
                            <div className="venue-detail-rating-user">
                              <div className="venue-detail-rating-avatar">
                                {userRating.user?.name
                                  ?.charAt(0)
                                  .toUpperCase() || "U"}
                              </div>
                              <div>
                                <div className="venue-detail-rating-name">
                                  {userRating.user?.name || "Người dùng"}
                                </div>
                                <div className="venue-detail-rating-stars">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      size={16}
                                      fill={
                                        star <= userRating.star_number
                                          ? "currentColor"
                                          : "none"
                                      }
                                      color={
                                        star <= userRating.star_number
                                          ? "#fbbf24"
                                          : "#d1d5db"
                                      }
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="venue-detail-rating-date">
                              {userRating.created_at
                                ? new Date(
                                    userRating.created_at
                                  ).toLocaleDateString("vi-VN")
                                : ""}
                            </div>
                          </div>
                          {userRating.review && (
                            <div className="venue-detail-rating-review">
                              {userRating.review}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="venue-detail-ratings-list">
                      <h4 className="venue-detail-section-title">
                        Đánh giá ({venueRatings.length})
                      </h4>
                      {venueRatings.length === 0 ? (
                        <div className="venue-detail-empty">
                          <p>Chưa có đánh giá nào</p>
                        </div>
                      ) : (
                        <div className="venue-detail-ratings-items">
                          {venueRatings
                            .filter((r) => r.user_id !== (user as any)?.id)
                            .map((rating) => (
                              <div
                                key={rating.id}
                                className="venue-detail-rating-item"
                              >
                                <div className="venue-detail-rating-header">
                                  <div className="venue-detail-rating-user">
                                    <div className="venue-detail-rating-avatar">
                                      {rating.user?.name
                                        ?.charAt(0)
                                        .toUpperCase() || "U"}
                                    </div>
                                    <div>
                                      <div className="venue-detail-rating-name">
                                        {rating.user?.name || "Người dùng"}
                                      </div>
                                      <div className="venue-detail-rating-stars">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                          <Star
                                            key={star}
                                            size={16}
                                            fill={
                                              star <= rating.star_number
                                                ? "currentColor"
                                                : "none"
                                            }
                                            color={
                                              star <= rating.star_number
                                                ? "#fbbf24"
                                                : "#d1d5db"
                                            }
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="venue-detail-rating-date">
                                    {rating.created_at
                                      ? new Date(
                                          rating.created_at
                                        ).toLocaleDateString("vi-VN")
                                      : ""}
                                  </div>
                                </div>
                                {rating.review && (
                                  <div className="venue-detail-rating-review">
                                    {rating.review}
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="venue-detail-error">
            <p>Không thể tải thông tin sân</p>
            <button onClick={onClose}>Đóng</button>
          </div>
        )}
      </div>
    </div>
  );
}
